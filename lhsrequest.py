import requests
import csv
from bs4 import BeautifulSoup

def update_options2():
    url="http://lowell-courseselection.org"
    headers = {'Cookie': 'AspxAutoDetectCookieSupport=1; ASP.NET_SessionId=iow1ge2sar4n3tjsjeyol1rc; .ASPXAUTH=80FB709232315863F3228E4E125BF3B9590E0D57B59FC0E2628589857F7E0DB052038E37214A3DD92C685DBA853A9D904523C4E42F4289C325E27C896B0EC3E1B1C1A0FE7FB255AA0A5739714E8AE241F17106ED6F36A19C33E4DF7A4187067DA3DACD21DA8FFD20B4D7D2E39183807F0760B4F1FBC088E38EBCFC2124A5E2D7F0632D3C246358D7AA87F83B1E11F819'}
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
