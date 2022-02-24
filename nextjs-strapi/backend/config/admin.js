module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '591643bb2ed977b5710cda1fd9addd15'),
  },
});
