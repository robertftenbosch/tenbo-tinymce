import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {Container, Row, Col, Table, Button,} from 'reactstrap';

export default function TenboEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    function mySave() {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
            let myContent = editorRef.current.getContent();
            console.log(myContent)
            localStorage.setItem("myContent", myContent);
        }

    }

    function onChange(event) {
        console.log(event)
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    }

    function myLoad() {
        let myContent = localStorage.getItem("myContent");
        console.log(myContent)
        if (editorRef.current) {
            console.log(editorRef.current.setContent(myContent));
        }
    }

    const onChangeInput = (event) => {
        console.log(event.target)
        console.log(event.target.value)
        console.log(event.target.id)
        let id = event.target.attributes.getNamedItem('data-table-id').value;
        let parsedHtml = getParseHtmlById(id);
        let element = parsedHtml.getElementById(id)
        if (element) {

            element.innerHTML = event.target.value;
        }
        console.log("section")
        console.log(element)
        editorRef.current.setContent(String(parsedHtml.body.outerHTML))
        console.log("test")

        return event.target.value
    }


    function getParseHtmlById(id) {
        let content = editorRef.current.getContent()
        let parser = new DOMParser();
        return parser.parseFromString(content, 'text/html');
    }

    const BackgroundColorThis = (event) => {
        let id = event.target.attributes.getNamedItem('data-table-id').value;
        let parsedHtml = getParseHtmlById(id);
        let element = parsedHtml.getElementById(id)
       element.style.backgroundColor = "#fbeeb8"
      
        editorRef.current.setContent(String(parsedHtml.body.outerHTML))
        console.log(element)
        console.log(id)
    }
    const RemoveBackgroundThis = (event) => {
        let id = event.target.attributes.getNamedItem('data-table-id').value;
        let parsedHtml = getParseHtmlById(id);
        let element = parsedHtml.getElementById(id)
        element.style.backgroundColor = null;
        editorRef.current.setContent(String(parsedHtml.body.outerHTML))
        console.log(element)

    }

   

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Editor tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<h3 id='convenant_title'>title</h3> De ondergetekenden <span id='p1_voornamen'>Voornamen</span> ten Bosch met BSN 12348765 wonende te Apeldoorn aan de Wegstraat 42 met postcode 1289AZ, geboren op 25-04-1987 te Leiden, hierna te noemen “de man”,
en
Vrouw Achternaam met BSN 98761234 wonende te Apeldoorn aan de Straatweg 24 met postcode 9821ZA, geboren op 25-04-1887 te Leiden, hierna te noemen “de vrouw”,
gezamenlijk te noemen “partijen”,
"

                                init={{
                                    selector: 'textarea#default',
                                    height: 500,
                                    menubar: true,
                                    branding: false,
                                    init_instance_callback: function (editor) {
                                       
                                    },
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor preview',
                                        'searchreplace visualblocks code fullscreen emoticons',
                                        'insertdatetime media table paste code help wordcount noneditable'
                                    ],
                                    toolbar: 'undo redo| template | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat  | help',

                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    setup: function (editor) {
                                        editor.on('Paste Change input Undo Redo', onChange);
                                        editor.on('ExecCommand', function (e) {
                                            if (e.command === 'mcePrint') {
                                                alert('Print');
                                            }
                                        });
                                    }
                                }}
                                inline
                        />
                    </Col>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Info</th>
                                <th>data-id</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Convenant title</td>
                                <td>3</td>
                                <td><input id={"table-3"} data-table-id="convenant_title" placeholder='Convenant Title'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>P1 voornaam</td>
                                <td>4</td>
                                <td><input id={"table-4"} data-table-id="p1_voornamen" placeholder='p1 voornamen'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>


                </Row>
                <Row>
                    <Col  xs="auto">
                        <button className={"btn btn-info"} onClick={mySave}>Save</button>
                        <button className={"btn btn-dark"} onClick={myLoad}>Load</button>
                        <button onClick={log}>Log editor content</button>
                    </Col>
                    <Col xs="3">

                    </Col>

                </Row>
                <Row/>


            </Container>

            <Container>
                <Row>
                    <Col>
                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            initialValue={"<h1>Artikel 1</h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac suscipit justo. Etiam varius odio a felis fermentum, sit amet gravida massa dapibus. Nulla semper nisl tristique lectus sagittis, nec sollicitudin lorem aliquam. Integer molestie nisi feugiat, cursus eros ut, posuere metus. Quisque sed tempor metus. Quisque mollis consectetur elit in sollicitudin. Cras ultrices, orci eu dignissim pellentesque, risus libero porta neque, in ullamcorper purus nunc quis sapien. Etiam cursus id magna vitae congue. Mauris consectetur orci quis ligula feugiat suscipit. Ut vestibulum sem lectus, quis luctus massa pulvinar non. Proin ac leo lorem. Phasellus pharetra lobortis efficitur. Praesent et sollicitudin magna. Sed at rutrum diam, nec volutpat mi. Phasellus cursus felis non sem viverra vestibulum."}
                            inline
                        />
                    </Col>
                    <Col>
                        <h1>Key words</h1>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Info</th>
                                <th>data-id</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Convenant title</td>
                                <td>3</td>
                                <td><input id={"table-3"} data-table-id="convenant_title" placeholder='Convenant Title'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>P1 voornaam</td>
                                <td>4</td>
                                <td><input id={"table-4"} data-table-id="p1_voornamen" placeholder='p1 voornamen'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>

                </Row>
                <Row>
                    <Col>

                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            initialValue={"<h1>Artikel 2</h1> Cras dictum eros vel nulla cursus, at malesuada felis mollis. Etiam sodales vestibulum quam, sed tempus metus lobortis eget. Donec vehicula, dui sit amet porta lobortis, mi nunc pellentesque leo, id porttitor felis nisl sit amet enim. Vivamus pharetra euismod tellus, tristique efficitur erat interdum ac. Sed viverra lorem erat, lacinia lacinia nunc maximus nec. Curabitur vulputate leo ac libero luctus, et dapibus turpis rhoncus. Sed sem lectus, malesuada at ornare eu, semper nec nunc. Fusce eleifend, mauris vitae congue condimentum, ipsum sem varius leo, iaculis feugiat urna quam vel lacus."}
                            inline
                        />
                    </Col>
                    <Col>
                        <h1>Key words</h1>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Info</th>
                                <th>data-id</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Convenant title</td>
                                <td>3</td>
                                <td><input id={"table-3"} data-table-id="convenant_title" placeholder='Convenant Title'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>P1 voornaam</td>
                                <td>4</td>
                                <td><input id={"table-4"} data-table-id="p1_voornamen" placeholder='p1 voornamen'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>

                </Row>
                <Row>
                    <Col>

                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
                            initialValue={"<h1>Artikel 3</h1> Suspendisse eleifend dui orci, non malesuada nulla scelerisque quis. Suspendisse sed viverra elit. Proin consequat pellentesque nunc. Etiam erat tellus, volutpat at pellentesque non, fringilla ac erat. Pellentesque in finibus leo. Duis vehicula, odio at elementum varius, nisl lacus tincidunt arcu, vel elementum dolor tortor at dui. In molestie nibh ut ex ornare, et luctus tellus dignissim. Donec scelerisque mi a diam lacinia, non faucibus tortor efficitur. Nunc laoreet lorem libero, eu mattis nulla bibendum eu. Phasellus vel commodo libero, non sollicitudin eros. Donec dolor dolor, ornare ac pulvinar eu, elementum non ligula. Nulla ex orci, rutrum non odio quis, maximus euismod sem. Pellentesque purus lorem, auctor a enim at, dapibus tempus lorem. Pellentesque quis neque eu justo sodales aliquam. Pellentesque at orci nibh. Nullam accumsan enim eget risus aliquam, non bibendum tortor eleifend."}
                            inline
                        />
                    </Col>
                    <Col>
                        <h1>Key words</h1>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Info</th>
                                <th>data-id</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Convenant title</td>
                                <td>3</td>
                                <td><input id={"table-3"} data-table-id="convenant_title" placeholder='Convenant Title'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>P1 voornaam</td>
                                <td>4</td>
                                <td><input id={"table-4"} data-table-id="p1_voornamen" placeholder='p1 voornamen'
                                           onMouseOver={BackgroundColorThis} onMouseOut={RemoveBackgroundThis}
                                           onChange={onChangeInput}/></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>

                </Row>


            </Container>

        </>
    );
}