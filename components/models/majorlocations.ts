interface IMajorLocations {
  id?: string;
  majorCity?: string;
}

export default IMajorLocations;

export class MajorLocations implements IMajorLocations {
  id: string | undefined;
  majorCity: string | undefined;
}
