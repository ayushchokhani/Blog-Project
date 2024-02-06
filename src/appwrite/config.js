import conf from '../conf/conf.js'
import { Client, ID, Databases, Storage, Query } from 'appwrite'

export class Service {
  client = new Client()
  databases
  storage

  //account should be made when constructor is called
  constructor() {
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        // we can also do ID.unique() instead of slug
        slug,
        {
          // we are saving these information, if we want we can other attributes as well
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error)
    }
  }

  // taking slug because we want to uniquely identify our document by its document_id
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error)
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deletePost(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      //we are returning true if database deleted and we will handle it in frontend
      return true
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error)
      return false
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error)
      //returning false if we didn't get any post
      return false
    }
  }

  //using query to get all posts whose status is active

  // queries here is just a variable
  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
        //if we have not written in parameters then we would have to write ot here in this manner
        // [
        //     Query.equal('status', 'active')
        // ]
      )
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error', error)
      return false
    }
  }

  // file uploading service
  // attach this service into different file

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error', error)
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId)
      return true
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error)
      return false
    }
  }

  //we could have put this in async too but its response is very fast, see documentation
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
  }
}

const service = new Service()
export default service
