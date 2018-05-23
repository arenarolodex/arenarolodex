import requests
import csv
from bs4 import BeautifulSoup

def update_options2():
    return
    url="http://lowell-courseselection.org"
    headers = {'Cookie': 'AspxAutoDetectCookieSupport=1;.ASPXAUTH=D3644034D3DB38E1E89813DCED3B2A28C4046E5EDE836B42CABB9E42D8A26B8E5E2EDA001CDDB7D988A764C1BFD186B2FD87A03CF50E7672216A09DC54A658DCDE225CA953838E926E7B034A2601E51F4CEC7E27AB459DFAA20B00B0A7C342480743814538F19E26B7631BBC48BD3C864745FCB6A03E18DF14BEC5940D5D9791709094AA43D1FBADE44D5F3A07E68036'}
    r = requests.post(url, headers=headers)

    soup = BeautifulSoup(r.text, 'html.parser')
    table = soup.find(id="MainContent_GridView1")

    with open('options2.csv', 'w', newline='') as csvout:
        writer = csv.writer(csvout, delimiter=',',
                            quotechar='\"', quoting=csv.QUOTE_MINIMAL)
        writer.writerow(["Department", "Course","Teacher","Block","Code","Seats"])
        i = 0
        dept = 1
        for row in table.find_all('tr'):
            contents = []
            if i == 0:
                i += 1
                continue
            if i == 109 or i == 195 or i == 293 or i == 384 or i == 434 or i == 505 or i == 545:
                dept += 1
            contents.append(str(dept))
            for col in row.find_all('td'):
                contents.append(str(col.string))
            writer.writerow(contents)
            i+=1
