import * as fs from 'fs'

interface File {
  path: string,
    name ? : string,
    uri ? : string,
    extension ? : string,
    bucket ? : string,
    metadatas ? : string,
    directories ? : string[],
    s3 ? : any
}


const fileFactory = (file: File) => {
  const extensionPos = file.path.lastIndexOf('.')
  const namePos = file.path.lastIndexOf('/')
  const self: File = {
    path: file.path,
    name: (namePos !== -1) ? file.path.substring(namePos + 1) : file.path,
    uri: (namePos !== -1 && extensionPos !== -1) ? file.path.substring(namePos + 1).split('.')[0] : file.path.split('.')[0],
    extension: (extensionPos !== -1) ? file.path.substring(extensionPos + 1) : null,
    bucket: (typeof file.bucket !== 'undefined') ? file.bucket : null,
    metadatas: (typeof file.metadatas !== 'undefined') ? file.metadatas : null,
    directories: file.path.split('/').slice(1, -1),
    s3: {
      put: () => {
        return {
          Bucket: self.bucket,
          Key: self.name,
          Body: fs.createReadStream(self.path),
          Metadata: self.metadatas
        }
      },
      get: () => {
        return {
          Bucket: self.bucket,
          Key: self.name
        }
      }
    }
  }
  return self
}

export { fileFactory as file, File }