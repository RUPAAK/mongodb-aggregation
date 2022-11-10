const app = require("express")();
const mongoose = require("mongoose");
const Country = require("./model/country");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/aggregrate");
    console.log("DB up");
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};

dbConnect();

app.get("/", async (req, res) => {
  //   const _data = await Country.aggregate([
  //     {
  //       $match: {
  //         _id: {
  //           $in: ["636d19783c4864a0195a24b6", "636d19783c4864a0195a24b7"].map(
  //             (each) => mongoose.Types.ObjectId(each)
  //           ),
  //         },
  //       },
  //     },
  //   ]);

  //   const __data = await Country.aggregate([
  //     {
  //       $sort: {
  //         continent: 1,
  //       },
  //     },
  //   ]);

  //   const ___data =  await Country.aggregate([
  //     {
  //       $group: {
  //         _id: {
  //           continent: "$continent",
  //           country: "$country",
  //         },
  //         highest_pop: {
  //           $max: "$population",
  //         },
  //         first_name: {
  //           $first: "$name",
  //         },
  //         total_count: {
  //           $sum: 1,
  //         },
  //       },
  //     },
  //   ]);

  //   const data = await Country.aggregate([
  //     {
  //       $project: {
  //         _id: 0,
  //         id: "$_id",
  //         location: {
  //           country: "$country",
  //           continent: "$continent",
  //         },
  //         name: "$name",
  //         population: "$population",
  //       },
  //     },
  //   ]);

  const data = await Country.aggregate([
    {
      $match: {
        population: {
          $gte: 20,
        },
      },
    },
    {
      $sort: {
        name: -1,
      },
    },
    {
      $group: {
        _id: {
          continent: "$continent",
        },
        high_pop: {
          $max: "$population",
        },
      },
    },
    {
      $project: {
        _id: false,
      },
    },
  ]);

  res.send({
    data,
  });
});

app.listen(9261, () => console.log("Server up and running"));
