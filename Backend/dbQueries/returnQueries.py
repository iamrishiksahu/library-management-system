def getAllReturns(cursor):
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
  books b ON i.bookId = b.bookId
                   WHERE
  i.is_returned = TRUE""")
    res = cursor.fetchall()

    return res

def createReturn(conn, data):

    try:

        cursor = conn.cursor()
        id = data["id"]
       

        cursor.execute("""UPDATE issued_books
    SET is_returned = TRUE
    WHERE issueId = %s""", id)
        
        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"

def getAllNotReturned(cursor):
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
  books b ON i.bookId = b.bookId
                   WHERE
  i.is_returned = FALSE""")
    res = cursor.fetchall()

    return res
