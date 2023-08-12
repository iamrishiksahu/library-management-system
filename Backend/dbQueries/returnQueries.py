def getAllReturns(cursor):
    cursor.execute("""SELECT
  i.issueId,
  b.title,
  m.full_name,
   i.returned_at
FROM
  members m
INNER JOIN
  issued_books i ON m.member_id = i.memberId
INNER JOIN
  books b ON i.bookId = b.bookId
                   WHERE
  i.is_returned = TRUE""")

    # cursor.execute("""SELECT * FROM issued_books""")


    res = cursor.fetchall()
    returned_books = []
    for row in res:
        item = {
            "issueId": row[0],
            "title": row[1],
            "full_name": row[2],
            "returned_at": row[3],
        }
        returned_books.append(item)

    return returned_books

def createReturn(conn, data):

    try:

        cursor = conn.cursor()
        id = data["issueId"]
        bookId = data["bookId"]
        cursor.execute("""UPDATE issued_books
    SET is_returned = TRUE
    WHERE issueId = %s""", id)
        
        conn.commit()
        cursor.execute("""UPDATE books
    SET stock = stock + 1
    WHERE bookId = %s""", bookId)
        conn.commit()

        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

def getAllNotReturned(cursor):
    cursor.execute("""SELECT
  i.issueId,
  b.title,
  m.full_name,
   i.returned_at
FROM
  members m
INNER JOIN
  issued_books i ON m.member_id = i.memberId
INNER JOIN
  books b ON i.bookId = b.bookId
                   WHERE
  i.is_returned = FALSE""")
    res = cursor.fetchall()
    not_returned_books = []
    for row in res:
        item = {
            "issueId": row[0],
            "title": row[1],
            "full_name": row[2],
            "issued_at": row[3],
        }
        not_returned_books.append(item)

    return not_returned_books
