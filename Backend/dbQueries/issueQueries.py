#     cursor.execute("""CREATE TABLE issued_books (
#   issueId serial PRIMARY KEY,
#   memberId int NOT NULL,
#   bookId int NOT NULL,
#   issued_at timestamp DEFAULT now(),
#  returned_at timestamp,
#     is_returned boolean NOT NULL
# );""")
def getAllIssues(cursor):
    # cursor.execute("""SELECT * FROM issued_books""")
    cursor.execute("""SELECT
  i.issueId,
  b.title,
  m.full_name,
  i.issued_at,
  i.is_returned,
                   i.bookId
FROM
  members m
INNER JOIN
  issued_books i ON m.member_id = i.memberId
INNER JOIN
  books b ON i.bookId = b.bookId
ORDER BY
  i.is_returned ASC,
  i.issued_at DESC
""")
    res = cursor.fetchall()
    issued_books = []
    for row in res:
        item = {
            "issueId": row[0],
            "title": row[1],
            "full_name": row[2],
            "issued_at": row[3],
            "is_returned": row[4],
            "bookId": row[5]
        }
        issued_books.append(item)

    return issued_books

def createIssue(conn, data):
    try:
        bookId = data["book_id"]
        memberId = data["member_id"]

        cursor = conn.cursor()
        
        cursor.execute(f"""SELECT COUNT(*) FROM issued_books where memberid = {memberId} and is_returned = false """)

        res = cursor.fetchone()
        totalIssued = res[0]
        

        if totalIssued >=  5:
            return "OVERDUE"

        cursor.execute("""INSERT INTO issued_books (memberId, bookId, is_returned) VALUES (%s, %s, %s)""", (memberId, bookId, False))

        conn.commit()

        # cursor.execute("""UPDATE books SET stock = stock -1 WHERE bookId = %s""", (bookId))
        # conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

    return data