# HiveAutoPowerUp

For the project to work properly, you need to open the `.env` file (you can use Notepad or Notepad++) and enter your Hive username and active key.

The program searches for the last operations performed by your account. If there is no Power Up operation on "today's date", a Power Up will be performed using the value configured in the HIVE_AMOUNT field of the `.env` file.

If there is already a Power Up operation on "today's date", whether done by Hive Auto Power Up or manually, the program will simply ignore it and will not perform any power up.

So far, the program cannot do anything if it is not executed (scheduled tasks may fail, lack of internet, for example), therefore, to maintain the daily Power Up routine, it is recommended to look at the log files or your Hive profile to see if the Power Up was performed successfully.

---
### ⚠️ WARNING
**Be very careful when handling your active key!**
Only put it in the `.env` file and **never share it with anyone**!

---
### 🛠️ `.env` configuration

Fill in the variables with your data. In HIVE_USERNAME you don't need to put @ before your username:

```env
HIVE_USERNAME=your_username
HIVE_ACTIVE_KEY=your_active_key
HIVE_AMOUNT=1.000
