import BoxLoader from "@/components/ui/box-loader";

export default function DemoOne() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-8">
        <h1 className="text-3xl font-bold">Box Loader Demo</h1>
        <BoxLoader />
        <p className="text-muted-foreground">This is a test of the box loader component</p>
      </div>
    </div>
  );
} 