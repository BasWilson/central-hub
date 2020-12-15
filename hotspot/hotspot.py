import nfc
import ndef
from threading import Thread


def beam(llc):
    snep_client = nfc.snep.SnepClient(llc)
    snep_client.put_records(
        [ndef.UriRecord('app://com.example.centralhub/hotspot/6472386472347237')])


def connected(llc):
    Thread(target=beam, args=(llc,)).start()
    return True


with nfc.ContactlessFrontend('usb') as clf:
    clf.connect(llcp={'on-connect': connected})
