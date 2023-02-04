export interface Transaction {
  _id: string
  amount: number
  type: 'expense' | 'income'
  category: 'salary' | 'freelance' | 'food' | 'entertainment' | 'investment' | 'education' | 'medical' | 'tax'
  date: string
  reference: string
  description?: string
  userid: string
  key?: string
}
