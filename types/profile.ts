export type Profile = {
  id: string;
  email: string;
  name: string | null;
  photo: string | null;
  phone: string | null;
  devices: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
