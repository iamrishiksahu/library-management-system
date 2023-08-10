def createMember(cursor, mem):
    cursor.execute(f"INSERT INTO membres () VALUES()")
    results = cursor.fetchOne()
    return results

def deleteMember(cursor, id):
    cursor.execute(f"DELETE * FROM members WHERE member_id={id}")
    results = cursor.fetchOne()
    return results


def getMember(cursor, id):
    cursor.execute(f"Select * FROM members WHERE member_id={id}")
    results = cursor.fetchOne()
    return results
def updateMember(cursor, data):
    return data;

def getAllMembers(cursor):
    cursor.execute(f"SELECT * FROM members")
    results = cursor.fetchall()
    members = []
    for row in results:
        item = {
            "member_id": row[0],
            "username": row[1],
            "full_name": row[2],
            "address": row[3],
            "phone": row[4],
            "created_at": row[5],
            "total_books_borrowed": row[6],
        }
        members.append(item)
    return members