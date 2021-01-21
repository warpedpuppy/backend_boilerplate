module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_URL: process.env.DB_URL || 'postgresql://dunder_mifflin@localhost/blogful-auth',
    JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
    RESOURCE_CATEGORIES: {medical: "129430", legal: "129500", art: "129425", other: "129412"}
  }
  