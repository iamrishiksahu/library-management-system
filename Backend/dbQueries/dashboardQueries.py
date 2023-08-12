def getDashboardCounts(cursor):
    cursor.execute("""SELECT COUNT(*) FROM books""")
    books = cursor.fetchall()
    cursor.execute("""SELECT COUNT(*) FROM members""")
    members = cursor.fetchall()
    cursor.execute("""SELECT COUNT(*) FROM issued_books""")
    issued = cursor.fetchall()
    cursor.execute("""SELECT COUNT(*) FROM issued_books WHERE is_returned = FALSE""")
    not_returned = cursor.fetchall()
    cursor.execute("""SELECT SUM(amount) FROM transactions""")
    earnings = cursor.fetchall()

    item = {
        "books" : books,
        "members" : members,
        "issued" : issued,
        "not_returned" : not_returned,
        "earnings": earnings
    }

    print(item)
    return item