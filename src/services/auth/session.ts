export type SessionUser = {
  username: string;
  roles: string[];
};

export async function getSessionUser(): Promise<SessionUser> {
  return {
    username: 'demo.user',
    roles: ['admin'],
  };
}
