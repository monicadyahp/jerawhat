// src/mvp/models/OurMissionModel.js
export default class OurMissionModel {
  getTitle() {
    return "Our Mission";
  }

  getMissionPoints() {
    return [
      {
        title: 'Empower Users',
        text: 'Provide easy-to-use, innovative tools that let anyone assess and understand their skin health at home.'
      },
      {
        title: 'Drive Innovation',
        text: 'Leverage advanced facial scanning and data analysis to deliver accurate, real-time skin insights.'
      },
      {
        title: 'Build Community',
        text: 'Foster a supportive community that shares tips, progress, and encourages confident self-care journeys.'
      }
    ];
  }
}