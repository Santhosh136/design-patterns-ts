const EVENTS = {
  NEW_VIDEO_ADDED: "new-video-added"
}

interface Observer {
  update(event: string): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(event: string): void;
}

class NotificationService {
  sendNotificationForNewVideo(name: string) {
    console.log("Sending notification to", name);
  }
}

class Subscriber implements Observer {
  private _name: string;
  get name() { return this._name }

  constructor(name: string) {
    this._name = name;
  }

  update(event: string): void {
    const notificationService = new NotificationService();
    if (event === EVENTS.NEW_VIDEO_ADDED ) 
      notificationService.sendNotificationForNewVideo(this._name);
  }
}

class YoutubeChannel implements Subject {

  private subscribers: Subscriber[];

  constructor() {
    this.subscribers = [];
  }

  attach(subscriber: Subscriber): void {
    this.subscribers.push(subscriber);
    console.log(subscriber.name ," Subscribed to a channel...");
  }

  detach(subscriber: Subscriber): void {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
    console.log(subscriber.name, " Unsubscribed from a channel...");
  }

  notify(event: string): void {
    this.subscribers.forEach(subscriber => subscriber.update(event));
  }
}

const myChannel = new YoutubeChannel();
const harry = new Subscriber("Harry");
const ron = new Subscriber("Ron");

myChannel.attach(harry);
myChannel.attach(ron);

myChannel.notify(EVENTS.NEW_VIDEO_ADDED);

myChannel.detach(ron);
myChannel.notify(EVENTS.NEW_VIDEO_ADDED);
