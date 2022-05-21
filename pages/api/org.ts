import { Octokit } from '@octokit/rest'
import { NextApiRequest, NextApiResponse } from 'next'

// Gets all members in the Purdue Hackers organization
// NOT for production use. Only for testing. Will disappear soon

const octokit = new Octokit({
  auth: process.env.GH_ACCESS_TOKEN
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const members = await octokit.rest.orgs.listMembers({
      org: 'purduehackers',
      per_page: 100
    })
    res.status(200).json({ members })
  }
}
