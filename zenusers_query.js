//insert users db

db.users.insertMany([
  {
    userId: 1,
    name: "aaa",
    email: "aaa1@gmail.com",
    mentorId: 1,
  },
  {
    userId: 2,
    name: "bbb",
    email: "bbb2@gmail.com",
    mentorId: 2,
  },
  {
    userId: 3,
    name: "ccc",
    email: "ccc3@gmail.com",
    mentorId: 3,
  },
  {
    userId: 4,
    name: "ddd",
    email: "ddd4@gmail.com",
    mentorId: 1,
  },
  {
    userId: 5,
    name: "eee",
    email: "eee5@gmail.com",
    mentorId: 2,
  },
]);

//Insert codekata db
db.codekata.insertMany([
  {
    userId: 1,
    problems: 50,
  },
  {
    userId: 2,
    problems: 40,
  },
  {
    userId: 3,
    problems: 60,
  },
  {
    userId: 4,
    problems: 30,
  },
  {
    userId: 5,
    problems: 20,
  },
]);

//insert topics db
db.topics.insertMany([
  {
    topicId: 1,
    topic: "html",
    topic_date: new Date("10-oct-2020"),
  },
  {
    topicId: 2,
    topic: "css",
    topic_date: new Date("20-oct-2020"),
  },
  {
    topicId: 3,
    topic: "javascript",
    topic_date: new Date("28-oct-2020"),
  },
  {
    topicId: 4,
    topic: "react",
    topic_date: new Date("05-nov-2020"),
  },
  {
    topicId: 5,
    topic: "nodejs",
    topic_date: new Date("20-nov-2020"),
  }
]);

//insert tasks db
db.tasks.insertMany([
  {
    taskId: 1,
    topicId: 1,
    userId: 1,
    task: "html task",
    due_date: new Date("10-oct-2020"),
    submitted: true,
  },
  {
    taskId: 2,
    topicId: 2,
    userId: 2,
    task: "css task",
    due_date: new Date("20-oct-2020"),
    submitted: true,
  },
  {
    taskId: 3,
    topicId: 3,
    userId: 3,
    task: "javascript task",
    due_date: new Date("28-oct-2020"),
    submitted: false,
  },
  {
    taskId: 4,
    topicId: 4,
    userId: 4,
    task: "react task",
    due_date: new Date("05-nov-2020"),
    submitted: false,
  },
  {
    taskId: 5,
    topicId: 5,
    userId: 5,
    task: "nodejs task",
    due_date: new Date("20-nov-2020"),
    submitted: false,
  },
]);

//insert attendance
db.attendance.insertMany([
  {
    userId: 1,
    topic: 1,
    attended: true,
  },
  {
    userId: 2,
    topic: 2,
    attended: true,
  },
  {
    userId: 3,
    topic: 3,
    attended: false,
  },
  {
    userId: 4,
    topic: 4,
    attended: true,
  },
  {
    userId: 5,
    topic: 5,
    attended: false,
  },
]);

//insert mentor
db.mentors.insertMany([
  {
    mentorId: 1,
    mentorName: "john",
    mentor_email: "john@gmail.com",
  },
  {
    mentorId: 1,
    mentorName: "doe",
    mentor_email: "doe@gmail.com",
  },
  {
    mentorId: 1,
    mentorName: "hulk",
    mentor_email: "hulk@gmail.com",
  },
  {
    mentorId: 1,
    mentorName: "cap",
    mentor_email: "cap@gmail.com",
  },
  {
    mentorId: 1,
    mentorName: "iron",
    mentor_email: "iron@gmail.com",
  }
]);

//insert company_drivers
db.companydrives.insertMany([
  {
    userId: 1,
    drive_date: new Date("15-oct-2020"),
    company: "TCS"
  },
  {
    userId: 2,
    drive_date: new Date("21-oct-2020"),
    company: "Infosys"
  },
  {
    userId: 3,
    drive_date: new Date("27-oct-2020"),
    company: "Wipro"
  },
  {
    userId: 4,
    drive_date: new Date("07-nov-2020"),
    company: "Mahindra"
  },
  {
    userId: 5,
    drive_date: new Date("21-nov-2020"),
    company: "HCL"
  },
]);

//1.Find all the topics and tasks which are thought in the month of October

db.topics.aggregate([

  {
    $lookup: {
      from: "tasks",
      localField: "topicId",
      foreignField: "topicId",
      as: "taskInfo",
    },
  },
  {
    $match: {
      $and: [
        {
          $or: [

            { topic_date: { $gt: new Date("30-sep-2020") } },
            { topic_date: { $lt: new Date("1st-nov-2020") } },

          ],
        },

        {
          $or: [
            { "taskInfo.due_date": { $gt: new Date("30-sep-2020") } },
            { "taskInfo.due_date": { $lt: new Date("1st-nov-2020") } },
          ],
        },
      ],
    },
  },
]);

//2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020

db.companydrives
  .find({
    $or: [
      { drive_date: { $gte: new Date("15-oct-2020") } },
      { drive_date: { $lte: new Date("31-oct-2020") } },
    ],
  });

//3.  Find all the company drives and students who are appeared for the placement.

db.companydrives
  .aggregate([
    {
      $lookup: {
        from: 'users',
        localField: "userId",
        foreignField: "userId",
        as: "userInfo",
      },
    },
    {
      $project: {
        _id: 0,
        "userInfo.name": 1,
        company: 1,
        drive_date: 1,
        "userInfo.email": 1,
        "userInfo.userId": 1,
      },
    },
  ]);

//4.Find the number of problems solved by the user in codekata
db.codekata
  .aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "userId",
        as: "userInfo",
      },
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        problems: 1,
        "userInfo.name": 1,
      },
    },
  ]);

//5.Find all the mentors with who has the mentee's count more than 15
db.users.aggregate([
  {
    $lookup: {
      from: "mentors",
      localField: "mentorId",
      foreignField: "mentorId",
      as: "mentorInfo",
    },
  },
  {
    $group: {
      _id: {
        mentorId: "$mentorInfo.mentorId",
        mentorName: "$mentorInfo.mentorName",
      },
      menteeCount: { $sum: 1 },
    },
  },
  { $match: { menteeCount: { $gt: 15 } } },
]);

//6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

db.attendance.aggregate([
  {
    $lookup: {
      from: "topics",
      localField: "topicId",
      foreignField: "topicId",
      as: "topics",
    },
  },
  {
    $lookup: {
      from: "tasks",
      localField: "topicId",
      foreignField: "topicId",
      as: "tasks",
    },
  },
  { $match: { $and: [{ attended: false }, { "tasks.submitted": false }] } },
  {
    $match: {
      $and: [
        {
          $or: [
            { "topics.topic_date": { $gte: new Date("15-oct-2020") } },
            { "topics.topic_date": { $lte: new Date("31-oct-2020") } },
          ],
        },
        {
          $or: [
            { "tasks.due_date": { $gte: new Date("15-oct-2020") } },
            { "tasks.due_date": { $lte: new Date("31-oct-2020") } },
          ],
        },
      ],
    },
  },
  {
    $count: "No_of_students_absent",
  },
]);


