function MainPage(){
    return(
        <div>
            <h1> Добро пожаловать на главную</h1>

            <form action="/upload" method="post" enctype="multipart/form-data">

                <label>Файл</label><br/>

                <input type="file" name="filedata" /> <br/>
                <input type="submit" value="Send" />
                </form>


        </div>
    )
}

export default MainPage;