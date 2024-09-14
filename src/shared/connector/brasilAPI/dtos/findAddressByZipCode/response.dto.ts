class Location {
  type: string;
  coordinates: Coordinates;
}

class Coordinates {
  longitude: string;
  latitude: string;
}

export class ResponseDTO {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
  location: Location;
}
