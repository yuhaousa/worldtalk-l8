import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export function ProgressOverview() {
  return (
    <section className="py-8">
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Words Learned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">247</div>
            <Progress value={65} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">65% of beginner level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Quiz Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">84%</div>
            <Progress value={84} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">Great progress!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold text-gray-900">12</span>
              <Badge variant="secondary" className="text-xs">
                days
              </Badge>
            </div>
            <p className="text-xs text-gray-500">Keep it up!</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
