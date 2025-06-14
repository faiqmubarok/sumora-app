export type Profile = {
  id: string;
  email: string;
  name: string | null;
  photo: {
    url: string;
    publicId: string;
  } | null;
  phone: string | null;
  devices: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
