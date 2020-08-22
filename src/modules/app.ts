export class PWAConfApp {
  private speakers: any;
  private schedule: any;
  private speakersDiv: HTMLDivElement;
  private scheduleDiv: HTMLDivElement;
  constructor() {
    this.speakersDiv = document.querySelector(".speakers");
    this.scheduleDiv = document.querySelector(".schedule");
    this.init();
  }

  async init() {
    await this.loadSpeakers();
    await this.loadSchedule();
  }

  async loadSpeakers() {
    this.speakers = (await import("../data/speakers.json")).default;
    this.speakersDiv.innerHTML = this.speakers.map(this.toSpeakerBlock).join("\n");
  }

  async loadSchedule() {
    const rawSchedule = (await import("../data/schedule.json")).default;

    // Add speaker details to array
    this.schedule = rawSchedule.map(this.addSpeakerDetails, this);
    this.scheduleDiv.innerHTML = this.schedule.map(this.toScheduleBlock).join("\n");
  }

  toSpeakerBlock(speaker: any) {
    return `
          <div class="speaker">
            <img src="${speaker.picture}" alt="${speaker.name}">
            <div>${speaker.name}</div>
          </div>`;
  }

  toScheduleBlock(scheduleItem: any) {
    return `
        <div class="schedule-item ${scheduleItem.category}">
          <div class="title-and-time">
            <div class="time">${scheduleItem.startTime}</div>
            <div class="title-and-speaker">
              <div class="title">${scheduleItem.title}</div>
              <div class="speaker">${
                scheduleItem.speaker ? scheduleItem.speaker.name : "&nbsp;"
              }</div>
            </div>
          </div>
          <p class="description">${scheduleItem.description}</p>
        </div>
      `;
  }

  addSpeakerDetails(item: any) {
    if (item.speakerId) {
      return Object.assign({}, item, {
        speaker: this.speakers.find((s: any) => s.id === item.speakerId),
      });
    }
    return Object.assign({}, item);
  }

  async fetchJSON(url: any) {
    const res = await fetch(url);
    return res.json();
  }
}
