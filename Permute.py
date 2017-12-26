import itertools
import sys

value = list(itertools.permutations(["English 2B",2,3,4,5,6,7,8]))
# sys.stdout = open("Test.txt", "w")
# print (value)
# print ("Test")


filename  = open("Test.xlsx",'w')
sys.stdout = filename
print (value)
