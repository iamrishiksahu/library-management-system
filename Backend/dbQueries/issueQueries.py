#     cursor.execute("""CREATE TABLE issued_books (
#   issueId serial PRIMARY KEY,
#   memberId int NOT NULL,
#   bookId int NOT NULL,
#   issued_at timestamp DEFAULT now(),
#  returned_at timestamp,
#     is_returned boolean NOT NULL
# );""")
def getAllIssues(cursor):
    cursor.execute("""SELECT
  m.full_name,
  m.phone,
  b.title,
  b.authors
FROM
  members m
INNER JOIN
  issued_books i ON m.member_id = i.memberId
INNER JOIN
  books b ON i.bookId = b.bookId""")
    res = cursor.fetchall()

    return res

def createIssue(conn, data):
    try:
        bookId = data["book_id"]
        memberId = data["member_id"]

        cursor = conn.cursor()
        cursor.execute("""INSERT INTO issued_books (memberId, bookId, is_returned) VALUES (%s, %s, %s)""", (memberId, bookId, False))

        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

    return data