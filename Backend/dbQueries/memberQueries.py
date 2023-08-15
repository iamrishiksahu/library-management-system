
def createMember(conn, mem):
    try:
        cursor = conn.cursor()
        name = mem["name"]
        phone = mem["phone"]
        address = mem["address"]
        cursor.execute("""INSERT INTO members (full_name, phone, address)
        VALUES (%s, %s, %s)""", (name, phone, address))
        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"


def deleteMember(conn, id):
    try:
        cursor = conn.cursor()
        sql = "DELETE FROM members WHERE member_id = " + id 
        cursor.execute(sql)
        
        conn.commit()
        return "SUCCESS"
    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"


def getMember(cursor, id):
    cursor.execute(f"Select * FROM members WHERE member_id={id}")
    results = cursor.fetchOne()
    return results
def updateMember(conn, data):

    try:

        id = data["memberId"]
        full_name = data["full_name"]
        phone = data["phone"]
        address = data["address"]

        cursor = conn.cursor();
        cursor.execute("""UPDATE members SET full_name = %s, phone = %s, address= %s WHERE member_id = %s """, (full_name, phone, address, id))

        conn.commit()

        return "SUCCESS"


    except Exception as e:
        print("An error occurred:", e)
        conn.rollback()
        return "FAILURE"



def getAllMembers(cursor):
    cursor.execute(f"SELECT * FROM members ORDER BY full_name")
    results = cursor.fetchall()
    members = []
    for row in results:
        item = {
            "member_id": row[0],
            "full_name": row[1],
            "address": row[2],
            "phone": row[3],
            "created_at": row[4],
            "total_books_borrowed": row[5],
        }
        members.append(item)
    return members

# MEMBERS TABLE
# INSERT INTO members (username, full_name, address, phone, created_at, total_books_borrowed)
# VALUES (%s, %s, %s, %s, NOW(), 0);
# """, ("rishik", "RKSAHU", "Ranchi", "8987400143"))
