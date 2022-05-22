interface RaindropFile {
  name: string
  id: string
  collectionId: string
  owner: string
}

interface User {
  username: string
  files: Array<RaindropFile>
  createdAt: string
}
