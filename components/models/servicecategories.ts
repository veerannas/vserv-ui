interface IServiceCategories {
  id?: string;
  category?: string;
}

export default IServiceCategories;

export class ServiceCategories implements ServiceCategories {
  id: string | undefined;
  category: string | undefined;
}
