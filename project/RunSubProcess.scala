import sbt._
import play.PlayRunHook

object RunSubProcess {

  def apply(command: String): PlayRunHook = {

    object RunSubProcessHook extends PlayRunHook {

      var process: Option[Process] = None

      override def beforeStarted(): Unit = {
        val execCommand =
          if (isWindows) s"cmd /c ${command}" else command
        process = Some(Process(execCommand).run())
      }

      override def afterStopped(): Unit = {
        process.foreach(_.destroy())
        process = None
      }
    }

    RunSubProcessHook
  }

  private def isWindows: Boolean = {
    val osName = System.getProperty("os.name")
    if (osName.contains("Windows")) {
      true
    } else {
      false
    }
  }

}