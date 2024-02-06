import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

  const navigate = useNavigate()
  const userData = useSelector(state => state.auth.userData)

  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // we can pass object in useForm
      defaultValues: {
        // user may come to edit previous values or create new value
        // if user has come for editing we have to provide default values to user
        title: post?.title || '',
        slug: post?.$id || '',
        content: post?.content || '',
        status: post?.status || 'active',
      },
    })

  

  // there will be 2 cases of submitting form: 1st time entry or updating prev post

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null

      // now deleting the previous image
      if (file) {
        await appwriteService.deleteFile(post.featuredImage)
      }

      // now for updating post we need slug as its id (check config.js in appwrite)
      // post.$id is the slug
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }

    // if no post present
    else {
      const file = await appwriteService.uploadFile(data.image[0])

      if (file) {
        // console.log(file);
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          userId: userData.$id,
          // spreading out data because we need userId too
          ...data,
        })

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  // we have 2 input title, slug
  // we will watch title, if user gives space then '-' will be provided in slug

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-')
    }

    return '' // if upper if is not present then returning empty string
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title, { shouldValidate: true }))
      }
    })

    // below done to optimize
    return () => {
      subscription.unsubscribe
    }
  }, [watch, slugTransform, setValue])

  return (
    // left side taking 2/3rd part right taking 1/3rd
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register('slug', { required: true })}
          onInput={(e) => {
            setValue('slug', slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues('content')}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status"
          className="mb-4"
          {...register('status', { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? 'bg-green-500' : undefined}
          className="w-full"
        >
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  )
}

export default PostForm
