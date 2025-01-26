class DBConnection {

  private static instance: DBConnection;
  private readonly url: string;
  private readonly username: string;
  private readonly password: string;
  private readonly dbName: string;

  private constructor(url: string, username: string, password: string, dbName: string) {
    this.dbName = dbName;
    this.password = password;
    this.username = username;
    this.url = url;

    console.log(`${dbName} database connected...`)
  };

  public static getInstance() : DBConnection {
    if (!DBConnection.instance) DBConnection.instance = new DBConnection(
      "localhost:5432", "sam", "sam", "test"
    );
    return DBConnection.instance;
  }

}

const s1 = DBConnection.getInstance();
const s2 = DBConnection.getInstance();
const s3 = DBConnection.getInstance();