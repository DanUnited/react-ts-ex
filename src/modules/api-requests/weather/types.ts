export interface IWeatherCoords {
  lat: number;
  lon: number;
}

export interface IWeather {
  id: number,
  main: string, // "Clouds"
  description: string,
  icon: string;
}

export interface IWeatherRequest {
  courseId: string;
}

export interface ITemperature {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

export interface IWeatherResponse {
  coord: IWeatherCoords;
  weather: IWeather[];
  base: string; // stations
  timezone: number, // 10800
  id: number,
  name: string, // "Moscow"
  cod: number, // 200
  visibility: number;
  temp: ITemperature;
}

export interface IWeatherForecastItem {
  clouds: number;
  dt: number;
  temp: ITemperature;
  weather: IWeather[];
}
