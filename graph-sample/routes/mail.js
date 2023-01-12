const router = require('express-promise-router').default();
const graph = require('../graph.js');

//const { body, validationResult } = require('express-validator');
//const validator = require('validator');
router.get('/', async function (req, res) {

    if (!req.session.userId) {
        // Redirect unauthenticated to signin
        res.redirect('/auth/signin?to=' + encodeURIComponent(req.originalUrl));
        return;
    }
    let mailId = req.query.id;
    // if (!mailId) {
    //     mailId = 'AAMkAGU5NDQxNjMzLTY4NzUtNGIzYi1iMjUwLTU2MjVhOTBkNzQwYgBGAAAAAADwLwLfK9grQqQcZ6v93Vw3BwDBAo4A-BCKR5nHjLkdAFhXAAAAAAEMAADBAo4A-BCKR5nHjLkdAFhXAAAAAA8eAAA=';
    // }
    if (!mailId) {
        const err = new Error('Email id is mandatory');
        // @ts-ignore
        err.status = 400;
        throw err;
    }
    const mail = await graph.getMailView(
        req.app.locals.msalClient,
        req.session.userId,
        mailId,
    );
    if (mail) {
        res.render('mail', {
            mail: {
                subject: mail.subject,
                hasAttachements: mail.hasAttachements ? 'Oui' : 'Non',
                sender: `${mail.sender.emailAddress.name} <${mail.sender.emailAddress.address}>`,
            }
        });
    }
});
module.exports = router;