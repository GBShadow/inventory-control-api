interface UserRequest extends Request {
  user: {
    id: number;
  };
}

export default UserRequest;
