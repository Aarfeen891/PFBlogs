const CategoryModel = require("../models/category");
const csvtojson = require("csvtojson");

exports.categorySeeder = async function (req, res) {
    try {
        const categoryData = await CategoryModel.find();
        console.log(categoryData);

        const count = await CategoryModel.count();
        console.log(count);
        
        if (categoryData == null) {
            return res.status(200).json({
                message: "Category list Data",
                categoryData,
            });
        }
        else if (categoryData == "") {
            const seedData = [ 
                {
                    category: 'Informative'
                },
                {
                    category: 'Education'
                },
                {
                    category: 'Entertainment'
                },
                {
                    category: 'Funny'
                },
               
            ];
            csvtojson()
                .fromFile("public/category.csv")
                .then(async (csvData) => {
                    // console.log(csvData);
                    await CategoryModel
                        .insertMany(seedData)
                        .then((res1) => {
                            // console.log(csvData);
                            return res.status(200).json({
                                message: "Category added successfuly!",
                                // countryCsvData,
                            });
                        });
                });
        }else{
            return res.status(200).json({
                message: "Category already exist",
                categoryData,
            });
        }
    } catch (error) {
        console.log("---------", error);
        return res.status(500).json({
            error:
                "Something went wrong which is why category collection is not working",
        });
    }
};