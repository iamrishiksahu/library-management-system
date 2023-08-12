    # cursor.execute("""CREATE TABLE transactions (transaction_id serial PRIMARY KEY, tnx_date timestamp DEFAULT NOW(), amount INTEGER NOT NULL, issueId VARCHAR(250) NOT NULL )""")


def getAllTransactions(cursor):
    cursor.execute("""SELECT
  t.transaction_id,
  t.tnx_date,
  m.full_name,
  b.title,
  t.amount
FROM
  transactions t
INNER JOIN
  issued_books i ON t.transaction_id = i.issueId
INNER JOIN
  members m ON i.memberId = m.member_id
INNER JOIN
  books b ON i.bookId = b.bookId""")
    
    res = cursor.fetchall()
    trans = []
    for row in res:
        item = {
            "transaction_id": row[0],
            "tnx_date": row[1],
            "full_name": row[2],
            "title": row[3],
            "amount": row[4],
        }
        trans.append(item)

    return trans

def createTransaction(conn, data):
    try:

        cursor = conn.cursor()
        cursor.execute("""INSERT INTO transactions (issueId, amount) VALUES (%s, %s)""", (2, 100))
        conn.commit()

        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"