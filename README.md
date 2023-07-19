npm i parse
//Import Parse minified version
import Parse from 'parse/dist/parse.min.js'

##

REACT_APP_BACK_API=XqauZ7rXuHNarrwuMjmmBmhGAuTpFaXND0YpI2DT
REACT_APP_BACK_JS=UupL5GOkuguhbT7czNVEbebCjTMjCciWwo6f4KW4

##

index.html

<script>
Parse.initialize("process.env.REACT_APP_BACK_API","process.env.REACT_APP_BACK_JS");
Parse.serverURL = 'https://parseapi.back4app.com/'
</script>
