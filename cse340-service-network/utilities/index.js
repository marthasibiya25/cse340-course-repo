// Check if user is logged in
const requireLogin = (req, res, next) => {


    if (!req.session.accountData) {

        req.flash(
            "notice",
            "Please log in to access this page."
        );


        return res.redirect("/account/login");

    }


    next();

};




// Check user role
const requireRole = (role) => {


    return (req, res, next) => {


        if (!req.session.accountData) {


            req.flash(
                "notice",
                "Please log in first."
            );


            return res.redirect("/account/login");

        }



        if (
            req.session.accountData.account_type !== role
        ) {


            req.flash(
                "notice",
                "You are not authorized to access this page."
            );


            return res.redirect("/account/dashboard");

        }



        next();


    };


};



export default {
    requireLogin,
    requireRole
};