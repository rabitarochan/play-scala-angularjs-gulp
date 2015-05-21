package controllers

import play.api._
import play.api.mvc._

object Application extends Controller with XhrActionSupport {

  def index = indexWithPath("/")

  def indexWithPath(path: String) = Action {
    Ok(views.html.main("play-scala-angularjs-gulp"))
  }

}
