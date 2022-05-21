import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GH_ACCESS_TOKEN
})

const isInOrg = async (username: string): Promise<boolean> => {
  let members = await octokit.rest.orgs.listMembers({
    org: 'purduehackers',
    per_page: 100
  })
  const member = members.data.filter((acc) => acc.login === username)
  return member !== null
}

export default isInOrg
