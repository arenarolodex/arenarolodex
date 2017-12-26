import itertools
import sys
import xlsxwriter

value = list(itertools.permutations(["English 2B",2,3,4,5,6,7,8]))
# sys.stdout = open("Test.txt", "w")
# print (value)
# print ("Test")


# filename  = open("Test.xlsx","w")
# sys.stdout = filename
# print (value)


workbook = xlsxwriter.Workbook('hello.xlsx')
worksheet = workbook.add_worksheet()

worksheet.write('A1-H40320', value)

workbook.close()