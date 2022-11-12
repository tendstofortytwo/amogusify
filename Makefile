ARCHIVE_NAME=amogusify.xpi
FILES=amogus.png content.js manifest.json


${ARCHIVE_NAME}: ${FILES}
	zip ${ARCHIVE_NAME} ${FILES}

.PHONY: clean

clean:
	rm -r ${ARCHIVE_NAME}
