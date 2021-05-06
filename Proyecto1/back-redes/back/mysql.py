import pymysql
import pymysql.cursors

class Database:


    def __init__(self):
        self.connection = pymysql.connect(
            host='database',
            user="root",
            passwd="201404104",
            db="nicte",
            cursorclass=pymysql.cursors.DictCursor,
            sql_mode=''
        )

    def listEvent(self, idEvento):

        try:
            with self.connection.cursor() as cursor:
                sql = "select  carnet, nombre, imagen from asistencia where idEvento = '%s'"
                cursor.execute(sql, idEvento)
                ret = cursor.fetchall()
                return ret
        except Exception as e:
            ret = {}
            ret['ok'] = False
            ret['error'] = str(e)
        return None

    def registrarEsistencia(self, carnet, nombre, nombreEvento, idEvento, imagen):

        try:
            cursor = self.connection.cursor()
            sql = "insert into asistencia (carnet, nombre, nombreEvento, idEvento, imagen) values ('%s',\'%s\', \'%s\','%s',\'%s\');"
            cursor.execute(sql % (carnet, nombre, nombreEvento, idEvento, imagen))
            self.connection.commit()
            return True
        except Exception as e:
            ret = {}
            ret['ok'] = False
            ret['error'] = str(e)
        return None



    def listIdCarnet(self, carnet):

        try:
            with self.connection.cursor() as cursor:
                sql = "select nombreEvento, idEvento, imagen from asistencia where carnet = '%s'"
                cursor.execute(sql, carnet)
                ret = cursor.fetchall()
                return ret
        except Exception as e:
            ret = {}
            ret['ok'] = False
            ret['error'] = str(e)
        return None