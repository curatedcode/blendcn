/** biome-ignore-all lint/a11y/useValidAnchor: need to use fake hrefs (#) for all the demo links */
"use client";

import {
  AlertCircleIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  PopcornIcon,
  RotateCcwIcon,
} from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { DemoSidebar } from "~/components/demo-sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button, buttonVariants } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Combobox } from "~/components/ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/components/ui/menubar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Progress } from "~/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SidebarProvider, useSidebar } from "~/components/ui/sidebar";
import { Slider } from "~/components/ui/slider";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Textarea } from "~/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export function ComponentPreview({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"div">, "children">) {
  return (
    <div
      className={cn([
        "mx-auto flex w-full max-w-7xl flex-col gap-3 md:grid md:grid-cols-2 md:gap-8",
        className,
      ])}
      {...props}
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <h1>Forms Elements</h1>
          <div className="grid items-center gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="johnsmith@example.com"
              className="w-[300px] bg-background"
            />
          </div>
          <Combobox
            options={[
              {
                value: "elijah-adams",
                label: "Elijah Adams",
              },
              {
                value: "owen-gomez",
                label: "Owen Gomez",
              },
              {
                value: "beau-ramos",
                label: "Beau Ramos",
              },
              {
                value: "luke-scott",
                label: "Luke Scott",
              },
              {
                value: "michael-perez",
                label: "Michael Perez",
              },
              {
                value: "jack-martin",
                label: "Jack Martin",
              },
              {
                value: "ezekiel-mendoza",
                label: "Ezekiel Mendoza",
              },
              {
                value: "hudson-cruz",
                label: "Hudson Cruz",
              },
            ]}
            width={300}
            emptyMessage="No users found..."
            placeholder="Select user..."
          />
          <Select>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="grid items-center gap-3">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="This is a sample message..."
              className="w-[300px] bg-background"
            />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="newsletter" className="bg-background" />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <div>
            <RadioGroup defaultValue="monthly">
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="weekly"
                  id="rg-weekly"
                  className="bg-background"
                />
                <Label htmlFor="rg-weekly">Weekly</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="monthly"
                  id="rg-monthly"
                  className="bg-background"
                />
                <Label htmlFor="rg-monthly">Monthly</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value="yearly"
                  id="rg-yearly"
                  className="bg-background"
                />
                <Label htmlFor="rg-yearly">Yearly</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:grid-rows-2">
            <Button>Default</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button variant={"outline"}>Outline</Button>
            <Button variant={"ghost"}>Ghost</Button>
            <Button variant={"destructive"}>Destructive</Button>
            <Button variant={"link"}>Link</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Feedback Messages</h1>
          <div className="flex flex-col gap-3">
            <Alert>
              <CheckCircle2Icon />
              <AlertTitle>Success! Your changes have been saved</AlertTitle>
              <AlertDescription>
                This is an alert with icon, title and description.
              </AlertDescription>
            </Alert>
            <Alert>
              <PopcornIcon />
              <AlertTitle>
                This Alert has a title and an icon. No description.
              </AlertTitle>
            </Alert>
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to process your payment.</AlertTitle>
              <AlertDescription>
                <p>Please verify your billing information and try again.</p>
                <ul className="list-inside list-disc text-sm">
                  <li>Check your card details</li>
                  <li>Ensure sufficient funds</li>
                  <li>Verify billing address</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <div className="flex gap-3">
          <h1>Menubar</h1>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  New Window <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>New Incognito Window</MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Share</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Email link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>Notes</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>
                  Print... <MenubarShortcut>⌘P</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>Find</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>Search the web</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem>Cut</MenubarItem>
                <MenubarItem>Copy</MenubarItem>
                <MenubarItem>Paste</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem>
                  Always Show Bookmarks Bar
                </MenubarCheckboxItem>
                <MenubarCheckboxItem checked>
                  Always Show Full URLs
                </MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset>
                  Reload <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled inset>
                  Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Hide Sidebar</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Profiles</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value="benoit">
                  <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                  <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                  <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarItem inset>Edit...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset>Add Profile...</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="flex gap-3">
          <h1>Pagination</h1>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <div className="flex flex-col gap-3">
          <h1>Badges</h1>
          <div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex w-full flex-wrap gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <div className="flex w-full flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="bg-blue-500 text-white dark:bg-blue-600"
                >
                  <BadgeCheckIcon />
                  Verified
                </Badge>
                <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                  8
                </Badge>
                <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="destructive"
                >
                  99
                </Badge>
                <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                  variant="outline"
                >
                  20+
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:pt-9">
        <div className="flex items-center gap-3">
          <Label htmlFor="switch-demo">Switch</Label>
          <Switch id="switch demo" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid items-center gap-3">
            <Label htmlFor="slider-demo">Slider</Label>
            <div className="flex gap-3">
              <Slider id="slider-demo" defaultValue={[66]} />
            </div>
          </div>
          <div className="grid items-center gap-3">
            <Label id="progress-demo">Progress</Label>
            <ProgressDemo />
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1>Dialog Trigger</h1>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="outline">Open dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">Name</Label>
                      <Input
                        id="name-1"
                        name="name"
                        defaultValue="Pedro Duarte"
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Username</Label>
                      <Input
                        id="username-1"
                        name="username"
                        defaultValue="@peduarte"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1>Popover Trigger</h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Dimensions</h4>
                    <p className="text-muted-foreground text-sm">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        defaultValue="100%"
                        className="col-span-2 h-8 bg-background dark:bg-background"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">Max. width</Label>
                      <Input
                        id="maxWidth"
                        defaultValue="300px"
                        className="col-span-2 h-8 bg-background dark:bg-background"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        defaultValue="25px"
                        className="col-span-2 h-8 bg-background dark:bg-background"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxHeight">Max. height</Label>
                      <Input
                        id="maxHeight"
                        defaultValue="none"
                        className="col-span-2 h-8 bg-background dark:bg-background"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1 className="whitespace-nowrap">Sidebar Trigger</h1>
            <SidebarProvider defaultOpen={false} className="min-h-0 flex-col">
              <DemoSidebar />
              <SidebarDemoTrigger />
            </SidebarProvider>
          </div>
          <div className="flex items-center justify-between gap-3">
            <h1>Toast Trigger</h1>
            <Button
              onClick={() =>
                toast("Event has been created", {
                  description: "Sunday, December 03, 2023 at 9:00 AM",
                  action: {
                    label: "Undo",
                    onClick: () => {},
                  },
                })
              }
            >
              Show a toast
            </Button>
          </div>
          <div className="flex justify-between gap-3">
            <Tooltip>
              <TooltipTrigger
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                <span className="hover:cursor-default">Tooltip on hover</span>
              </TooltipTrigger>
              <TooltipContent>This is tooltip!</TooltipContent>
            </Tooltip>
            <HoverCard>
              <HoverCardTrigger
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                <span className="hover:cursor-default">Card on hover</span>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between gap-4">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/101021848?v=4" />
                    <AvatarFallback>ZF</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">Zack F.</h4>
                    <p className="text-sm">
                      My github profile image. I hope you like it :)
                    </p>
                    {/* <div className="text-muted-foreground text-xs">
                        Joined December 2021
                      </div> */}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Avatars</h1>
            <div className="flex flex-row flex-wrap items-center gap-6">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="rounded-lg">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div className="-space-x-2 flex *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/leerob.png"
                    alt="@leerob"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Accordion</h1>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    Our flagship product combines cutting-edge technology with
                    sleek design. Built with premium materials, it offers
                    unparalleled performance and reliability.
                  </p>
                  <p>
                    Key features include advanced processing capabilities, and
                    an intuitive user interface designed for both beginners and
                    experts.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Shipping Details</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We offer worldwide shipping through trusted courier
                    partners. Standard delivery takes 3-5 business days, while
                    express shipping ensures delivery within 1-2 business days.
                  </p>
                  <p>
                    All orders are carefully packaged and fully insured. Track
                    your shipment in real-time through our dedicated tracking
                    portal.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Return Policy</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>
                    We stand behind our products with a comprehensive 30-day
                    return policy. If you&apos;re not completely satisfied,
                    simply return the item in its original condition.
                  </p>
                  <p>
                    Our hassle-free return process includes free return shipping
                    and full refunds processed within 48 hours of receiving the
                    returned item.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-col gap-3">
            <h1>Table</h1>
            <TableDemo />
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarDemoTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button onClick={() => toggleSidebar()} className="ml-auto w-fit">
      Toggle sidebar
    </Button>
  );
}

function TableDemo() {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function ProgressDemo() {
  const initialProgress = 0;
  const [progress, setProgress] = React.useState(initialProgress);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (progress >= 100) return;
      setProgress((v) => v + 10);
    }, 500);
    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="flex items-center gap-3">
      <Progress id="progress-demo" value={progress} />
      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={() => setProgress(initialProgress)}
      >
        <span className="sr-only">Reset progress</span>
        <RotateCcwIcon />
      </Button>
    </div>
  );
}
