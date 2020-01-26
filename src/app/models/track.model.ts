export class Track {
  id: number;
  orderID: number;
  amount: any;
  date: string;
  type: string;


  constructor(data: any) {
    this.id = data.id;
    this.orderID = data.order_id;
    this.type = data.type;
    this.amount = data.amount;
    this.date = data.date;
  }

  static arrayCast(data: any): Track [] {
    const tracks: Track [] = [];
    data.data.forEach(trackItem => {
      const track = new Track(trackItem);
      tracks.push(track);
    });
    return tracks;
  }

  static Cast(track) {
    track.orderID = track.order_id;
    delete track.order_id;

    return track;
  }

  static revertCast(track) {
    track.order_id = track.orderID;
    delete track.orderID;

    return track;
  }

  static getEmptyTrack(): Track {
    return {
      id: null,
      amount: null,
      date: null,
      type: null,
      orderID: null
    };
  }
}
