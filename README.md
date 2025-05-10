For the project to work, you need to open the .env file (you can use Notepad or Notepad++) and enter your username and active key.

ATTENTION!!!! Be very careful when handling your active key! Only put it in the file and do not share it with anyone!

In HIVE_USERNAME, enter your hive username (no need for the @) and in HIVE_ACTIVE_KEY, your active key. In HIVE_AMOUNT, enter the amount of hive you want to power up per day. Remember to have this balance available in your account.

HIVE_USERNAME=your_hive_user
HIVE_ACTIVE_KEY=your_private_key
HIVE_AMOUNT=1.000

The project works by checking whether, on today's date (using the UTC standard), any Power UP (PU) has already been performed. If it has been performed, it will not do it again. If you do a manual PU of any value, the project will NOT PU on that day.
