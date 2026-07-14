app.get("/categories", (req, res) => {
    const categories = [
        {
            category_name: "Community Service"
        },
        {
            category_name: "Environmental"
        },
        {
            category_name: "Education"
        }
    ];

    res.render("categories", {
        title: "Service Project Categories",
        categories
    });
});