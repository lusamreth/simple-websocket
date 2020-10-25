mod router;
use actix_files as fs;
use actix_web::{http, web, App, HttpResponse};
use http::StatusCode;
use serde::{Deserialize, Serialize};
type URI = String;
use actix_web;
#[derive(Serialize)]
struct ServerError101<D, E> {
    err_type: URI,
    details: Vec<D>,
    ext: Option<E>,
}
async fn not_found() -> HttpResponse {
    let mut resp = HttpResponse::build(StatusCode::NOT_FOUND);
    let type_uri = String::from("http://unavialable-route");
    let details = String::from("Unavialable routes!");
    let ext: Option<String> = None;
    let se = ServerError101 {
        err_type: type_uri,
        details: vec![details],
        ext,
    };
    resp.json(se)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    actix_web::HttpServer::new(|| {
        App::new()
            .default_service(web::route().to(not_found))
            .route(
                "/html",
                web::get().to(|| {
                    HttpResponse::Found()
                        .header("LOCATION", "/static/todo.html")
                        .finish()
                }),
            )
            .service(fs::Files::new("/static/", "static/"))
            .route("wss", web::get().to(router::index))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
